import { Id } from "@/convex/_generated/dataModel";

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

interface EditingIndicatorProps {
	todoId: Id<"todos">;
	users: User[];
}

export default function EditingIndicator({ todoId, users }: EditingIndicatorProps) {
	// このToDoを編集中のユーザーを取得
	const editingUsers = users.filter(
		user => user.isEditing && user.editingTodoId === todoId
	);

	if (editingUsers.length === 0) return null;

	return (
		<div className="flex items-center gap-2 mt-2">
			{/* 編集中アニメーション */}
			<div className="flex gap-1">
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
						style={{
							animationDelay: `${i * 200}ms`,
							animationDuration: "1s",
						}}
					></div>
				))}
			</div>
			
			{/* 編集中ユーザー表示 */}
			<div className="flex items-center gap-2">
				{editingUsers.slice(0, 3).map((user) => (
					<div
						key={user.userId}
						className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm border-2 border-white/50"
						style={{ backgroundColor: user.userColor }}
						title={`${user.userName}が編集中`}
					>
						{user.userName.charAt(0)}
					</div>
				))}
				{editingUsers.length > 3 && (
					<span className="text-xs text-white/60">
						+{editingUsers.length - 3}
					</span>
				)}
			</div>
			
			<span className="text-xs text-yellow-300/80 animate-pulse">
				編集中...
			</span>
		</div>
	);
}