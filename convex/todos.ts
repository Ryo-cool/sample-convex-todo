import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
	args: {},
	handler: async ctx => {
		return await ctx.db.query("todos").order("desc").collect();
	},
});

export const searchTodos = query({
	args: {
		searchTerm: v.string(),
		filter: v.optional(v.union(v.literal("all"), v.literal("completed"), v.literal("pending"))),
		sortBy: v.optional(v.union(v.literal("newest"), v.literal("oldest"), v.literal("alphabetical"))),
	},
	handler: async (ctx, args) => {
		let todos = await ctx.db.query("todos").collect();

		// テキスト検索
		if (args.searchTerm.trim()) {
			const searchLower = args.searchTerm.toLowerCase();
			todos = todos.filter(todo =>
				todo.text.toLowerCase().includes(searchLower)
			);
		}

		// フィルタリング
		if (args.filter && args.filter !== "all") {
			if (args.filter === "completed") {
				todos = todos.filter(todo => todo.isCompleted);
			} else if (args.filter === "pending") {
				todos = todos.filter(todo => !todo.isCompleted);
			}
		}

		// ソート
		switch (args.sortBy) {
			case "oldest":
				todos.sort((a, b) => a.createdAt - b.createdAt);
				break;
			case "alphabetical":
				todos.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
				break;
			case "newest":
			default:
				todos.sort((a, b) => b.createdAt - a.createdAt);
				break;
		}

		return todos;
	},
});

export const createTodo = mutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const newTodo = await ctx.db.insert("todos", {
			text: args.text,
			isCompleted: false,
			createdAt: Date.now(),
		});
		return newTodo;
	},
});

export const toggleTodo = mutation({
	args: {
		id: v.id("todos"),
	},
	handler: async (ctx, args) => {
		const todo = await ctx.db.get(args.id);
		if (!todo) {
			throw new Error("Todo not found");
		}

		await ctx.db.patch(args.id, {
			isCompleted: !todo.isCompleted,
		});
	},
});

export const deleteTodo = mutation({
	args: {
		id: v.id("todos"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
