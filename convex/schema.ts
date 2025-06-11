import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	todos: defineTable({
		text: v.string(),
		isCompleted: v.boolean(),
		createdAt: v.number(),
	}),
	presence: defineTable({
		userId: v.string(),
		userName: v.string(),
		userColor: v.string(),
		lastSeen: v.number(),
		isEditing: v.boolean(),
		editingTodoId: v.optional(v.id("todos")),
		cursorPosition: v.optional(
			v.object({
				x: v.number(),
				y: v.number(),
			})
		),
	}),
});
