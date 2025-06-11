import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import EditingIndicator from "./EditingIndicator";

interface User {
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

interface TodoItemProps {
	todo: {
		_id: Id<"todos">;
		text: string;
		isCompleted: boolean;
		createdAt: number;
	};
	index: number;
	activeUsers?: User[];
	onEditingChange?: (isEditing: boolean, todoId?: Id<"todos">) => void;
}

export default function TodoItem({
	todo,
	index: _index, // アニメーション用（現在無効）
	activeUsers = [],
	onEditingChange,
}: TodoItemProps) {
	const toggleTodo = useMutation(api.todos.toggleTodo);
	const deleteTodo = useMutation(api.todos.deleteTodo);

	const handleToggle = () => {
		onEditingChange?.(true, todo._id);
		toggleTodo({ id: todo._id }).finally(() => {
			onEditingChange?.(false);
		});
	};

	const handleDelete = () => {
		onEditingChange?.(true, todo._id);
		deleteTodo({ id: todo._id }).finally(() => {
			onEditingChange?.(false);
		});
	};

	return (
		<div
			className={`glass glass-hover rounded-2xl p-6 backdrop-blur-2xl bg-white/10 border border-white/20
                 shadow-xl hover:shadow-2xl transform transition-all duration-500 ease-out
                 hover:scale-102 hover:bg-white/15 group ${todo.isCompleted ? "opacity-75" : ""}`}
		>
			<div className="flex items-center gap-5">
				{/* プレミアムチェックボックス */}
				<label className="relative cursor-pointer group/check">
					<input
						type="checkbox"
						checked={todo.isCompleted}
						onChange={handleToggle}
						className="sr-only"
					/>
					<div
						className={`w-7 h-7 rounded-xl border-2 transition-all duration-300 shadow-lg
                         flex items-center justify-center backdrop-blur-sm relative overflow-hidden
            ${
							todo.isCompleted
								? "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 border-transparent shadow-purple-500/40 scale-110"
								: "border-white/50 bg-white/10 hover:border-white/70 hover:bg-white/20 hover:scale-110 group-hover/check:shadow-white/30"
						}`}
					>
						{/* チェックマーク */}
						{todo.isCompleted && (
							<svg
								className="w-5 h-5 text-white z-10 animate-in zoom-in duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={3}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						)}

						{/* ホバーエフェクト */}
						{!todo.isCompleted && (
							<div
								className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0
                            group-hover/check:from-purple-400/20 group-hover/check:to-pink-400/20
                            transition-all duration-300 rounded-xl"
							></div>
						)}
					</div>
				</label>

				{/* スタイリッシュなタスクテキスト */}
				<span
					className={`flex-1 text-lg font-medium transition-all duration-300 leading-relaxed ${
						todo.isCompleted
							? "line-through text-white/40 italic"
							: "text-white/95 group-hover:text-white"
					}`}
				>
					{todo.text}
				</span>

				{/* モダンな削除ボタン */}
				<button
					onClick={handleDelete}
					className="group/del p-3 rounded-xl transition-all duration-300 relative overflow-hidden
                   hover:bg-red-500/20 hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-red-400/50"
				>
					<svg
						className="w-5 h-5 text-white/50 group-hover/del:text-red-400
                        transition-all duration-300 relative z-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>

					{/* ホバーエフェクト */}
					<div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent
                        transform -translate-x-full group-hover/del:translate-x-full
                        transition-transform duration-500"
					></div>
				</button>
			</div>

			{/* 編集中インジケーター */}
			<EditingIndicator todoId={todo._id} users={activeUsers} />

			{/* タイムスタンプ */}
			<div className="mt-4 pl-12 text-xs text-white/40 font-light tracking-wide">
				{new Date(todo.createdAt).toLocaleString("ja-JP", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})}
			</div>
		</div>
	);
}
