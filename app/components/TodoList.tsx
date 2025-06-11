"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useMemo } from "react";

import Header from "./Header";
import TodoForm from "./TodoForm";
import EmptyState from "./EmptyState";
import TodoItem from "./TodoItem";
import StatsPanel from "./StatsPanel";
import ActiveUsers from "./ActiveUsers";
// import UserCursors from "./UserCursors"; // カーソル共有は一時的にオフ
import SearchAndFilter from "./SearchAndFilter";
import SearchEmptyState from "./SearchEmptyState";
import { usePresence } from "../hooks/usePresence";

export default function TodoList() {
	const todos = useQuery(api.todos.getTodos);
	const { activeUsers, setEditingStatus } = usePresence();

	// 検索・フィルター状態
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
	const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");

	// 検索結果をメモ化
	const filteredTodos = useMemo(() => {
		if (!todos) return [];

		let filtered = [...todos];

		// テキスト検索
		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(todo =>
				todo.text.toLowerCase().includes(searchLower)
			);
		}

		// フィルタリング
		if (filter !== "all") {
			if (filter === "completed") {
				filtered = filtered.filter(todo => todo.isCompleted);
			} else if (filter === "pending") {
				filtered = filtered.filter(todo => !todo.isCompleted);
			}
		}

		// ソート
		switch (sortBy) {
			case "oldest":
				filtered.sort((a, b) => a.createdAt - b.createdAt);
				break;
			case "alphabetical":
				filtered.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
				break;
			case "newest":
			default:
				filtered.sort((a, b) => b.createdAt - a.createdAt);
				break;
		}

		return filtered;
	}, [todos, searchTerm, filter, sortBy]);

	const hasSearchOrFilter = !!(searchTerm.trim() || filter !== "all" || sortBy !== "newest");

	// ローディング状態
	if (todos === undefined) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="glass animate-pulse rounded-full px-12 py-6 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl">
					<span className="text-white font-semibold text-lg tracking-wide">読み込み中...</span>
				</div>
			</div>
		);
	}

	// 完全に空の状態（タスクが1つもない）
	if (todos && todos.length === 0) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-2xl mx-auto text-center">
					{/* ヘッダーエリア */}
					<div className="mb-8">
						<Header />
					</div>

					{/* フォームエリア（独立カード） */}
					<div className="mb-12">
						<TodoForm variant="hero" onEditingChange={setEditingStatus} />
					</div>

					{/* 結果エリア（控えめな空状態） */}
					<div>
						<EmptyState />
					</div>
				</div>

				{/* リアルタイムコラボレーション UI */}
				<ActiveUsers users={activeUsers} />
				{/* <UserCursors users={activeUsers} /> カーソル共有は一時的にオフ */}
			</div>
		);
	}

	// タスクありの効率的なレイアウト
	return (
		<div className="min-h-screen py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* コンパクトヘッダー */}
				<Header compact />

				{/* スマート入力フォーム */}
				<TodoForm variant="compact" onEditingChange={setEditingStatus} />

				{/* 検索・フィルター */}
				<SearchAndFilter
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					filter={filter}
					onFilterChange={setFilter}
					sortBy={sortBy}
					onSortChange={setSortBy}
					totalCount={todos?.length || 0}
					filteredCount={filteredTodos.length}
				/>

				{/* ToDoリスト */}
				{filteredTodos.length > 0 ? (
					<section className="space-y-5">
						{filteredTodos.map((todo, index) => (
							<TodoItem 
								key={todo._id} 
								todo={todo} 
								index={index} 
								activeUsers={activeUsers}
								onEditingChange={setEditingStatus}
							/>
						))}
					</section>
				) : (
					<SearchEmptyState
						searchTerm={searchTerm}
						filter={filter}
						onClearSearch={() => {
							setSearchTerm("");
							setFilter("all");
							setSortBy("newest");
						}}
					/>
				)}

				{/* プレミアム統計ダッシュボード（結果がある場合のみ） */}
				{filteredTodos.length > 0 && (
					<StatsPanel 
						todos={hasSearchOrFilter ? filteredTodos : todos || []}
						isFiltered={hasSearchOrFilter}
					/>
				)}
			</div>

			{/* リアルタイムコラボレーション UI */}
			<ActiveUsers users={activeUsers} />
			{/* <UserCursors users={activeUsers} /> カーソル共有は一時的にオフ */}
		</div>
	);
}
