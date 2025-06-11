import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// プレゼンス情報の型定義
export interface UserPresence {
  userId: string;
  userName: string;
  userColor: string;
  lastSeen: number;
  isEditing: boolean;
  editingTodoId?: string;
  cursorPosition?: {
    x: number;
    y: number;
  };
}

// アクティブユーザーの取得
export const getActiveUsers = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const oneMinuteAgo = now - 1 * 60 * 1000; // 1分前（より短い間隔）

    const activePresences = await ctx.db
      .query("presence")
      .filter((q) => q.gte(q.field("lastSeen"), oneMinuteAgo))
      .collect();

    return activePresences;
  },
});

// 古いプレゼンス情報のクリーンアップ
export const cleanupOldPresence = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000; // 5分前

    const oldPresences = await ctx.db
      .query("presence")
      .filter((q) => q.lt(q.field("lastSeen"), fiveMinutesAgo))
      .collect();

    // 古いプレゼンス情報を削除
    for (const presence of oldPresences) {
      await ctx.db.delete(presence._id);
    }

    return { deleted: oldPresences.length };
  },
});

// ユーザーのプレゼンス更新
export const updatePresence = mutation({
  args: {
    userId: v.string(),
    userName: v.string(),
    userColor: v.string(),
    isEditing: v.boolean(),
    editingTodoId: v.optional(v.id("todos")),
    cursorPosition: v.optional(
      v.object({
        x: v.number(),
        y: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existingPresence = await ctx.db
      .query("presence")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    const presenceData = {
      userId: args.userId,
      userName: args.userName,
      userColor: args.userColor,
      lastSeen: Date.now(),
      isEditing: args.isEditing,
      editingTodoId: args.editingTodoId,
      cursorPosition: args.cursorPosition,
    };

    if (existingPresence) {
      await ctx.db.patch(existingPresence._id, presenceData);
    } else {
      await ctx.db.insert("presence", presenceData);
    }
  },
});

// ユーザーの削除（ログアウト時など）
export const removePresence = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const presence = await ctx.db
      .query("presence")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (presence) {
      await ctx.db.delete(presence._id);
    }
  },
});

// 編集状態の更新
export const updateEditingStatus = mutation({
  args: {
    userId: v.string(),
    isEditing: v.boolean(),
    editingTodoId: v.optional(v.id("todos")),
  },
  handler: async (ctx, args) => {
    const presence = await ctx.db
      .query("presence")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (presence) {
      await ctx.db.patch(presence._id, {
        isEditing: args.isEditing,
        editingTodoId: args.editingTodoId,
        lastSeen: Date.now(),
      });
    }
  },
});