import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

interface TodoFormProps {
	variant?: "hero" | "compact";
	onEditingChange?: (isEditing: boolean) => void;
}

export default function TodoForm({ variant = "compact", onEditingChange }: TodoFormProps) {
	const createTodo = useMutation(api.todos.createTodo);
	const [newTodoText, setNewTodoText] = useState("");
	const [isInputFocused, setIsInputFocused] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodoText.trim()) {
			onEditingChange?.(true);
			try {
				await createTodo({ text: newTodoText });
				setNewTodoText("");
			} finally {
				onEditingChange?.(false);
			}
		}
	};

	if (variant === "hero") {
		return (
			<section className="max-w-xl mx-auto">
				<form onSubmit={handleSubmit} className="group">
					<div
						className={`glass rounded-3xl p-2 transition-all duration-500 ease-out backdrop-blur-2xl bg-white/20 border-2 border-white/30 shadow-2xl ${
							isInputFocused
								? "ring-4 ring-white/40 scale-105 shadow-white/20 bg-white/25"
								: "hover:scale-102 hover:bg-white/25 hover:border-white/40"
						}`}
					>
						<div className="flex gap-3 p-4">
							<input
								type="text"
								value={newTodoText}
								onChange={e => setNewTodoText(e.target.value)}
								onFocus={() => setIsInputFocused(true)}
								onBlur={() => setIsInputFocused(false)}
								placeholder="新しいタスクを入力..."
								className="flex-1 px-6 py-5 bg-white/20 backdrop-blur-md rounded-2xl
                         text-white placeholder-white/60 outline-none text-lg font-medium
                         border-2 border-white/20 transition-all duration-300
                         focus:bg-white/30 focus:border-white/50 focus:placeholder-white/80
                         shadow-inner"
							/>
							<button
								type="submit"
								disabled={!newTodoText.trim()}
								className="group/btn px-8 py-5 rounded-2xl font-bold text-white text-lg
                         bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600
                         hover:from-purple-600 hover:via-pink-600 hover:to-purple-700
                         disabled:from-gray-500/70 disabled:via-gray-600/70 disabled:to-gray-700/70
                         backdrop-blur-sm border-2 border-white/30
                         transition-all duration-300 transform
                         hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25
                         active:scale-95 disabled:scale-100 disabled:cursor-not-allowed
                         shadow-lg whitespace-nowrap relative overflow-hidden"
							>
								<span className="relative z-10 tracking-wide">追加</span>
								<div
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                              transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full
                              transition-transform duration-700"
								></div>
							</button>
						</div>
					</div>
				</form>
			</section>
		);
	}

	return (
		<section>
			<form onSubmit={handleSubmit} className="group">
				<div
					className={`glass rounded-2xl p-2 transition-all duration-300 backdrop-blur-2xl bg-white/15 border border-white/25 shadow-xl ${
						isInputFocused
							? "ring-3 ring-white/40 scale-105 shadow-2xl shadow-white/10"
							: "hover:bg-white/20 hover:scale-102"
					}`}
				>
					<div className="flex gap-3 p-3">
						<input
							type="text"
							value={newTodoText}
							onChange={e => setNewTodoText(e.target.value)}
							onFocus={() => setIsInputFocused(true)}
							onBlur={() => setIsInputFocused(false)}
							placeholder="新しいタスクを入力..."
							className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-md rounded-xl
                       text-white placeholder-white/60 outline-none text-base font-medium
                       border border-white/20 transition-all duration-300
                       focus:bg-white/30 focus:border-white/40 focus:placeholder-white/80
                      shadow-inner"
						/>
						<button
							type="submit"
							disabled={!newTodoText.trim()}
							className="group/btn px-8 py-4 rounded-xl font-bold text-white text-base
                       bg-gradient-to-r from-purple-500 to-pink-500
                       hover:from-purple-600 hover:to-pink-600
                       disabled:from-gray-500 disabled:to-gray-600
                       backdrop-blur-sm border border-white/30
                       transition-all duration-300 transform
                       hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20
                       active:scale-95 disabled:scale-100 disabled:cursor-not-allowed
                       shadow-lg whitespace-nowrap relative overflow-hidden"
						>
							<span className="relative z-10">追加</span>
							<div
								className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                            transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full
                            transition-transform duration-500"
							></div>
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}
