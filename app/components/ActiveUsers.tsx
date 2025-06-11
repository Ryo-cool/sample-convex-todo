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

interface ActiveUsersProps {
	users: User[];
}

export default function ActiveUsers({ users }: ActiveUsersProps) {
	if (users.length === 0) return null;

	return (
		<div className="fixed top-6 right-6 z-50">
			<div className="glass rounded-2xl p-4 backdrop-blur-2xl bg-white/15 border border-white/25 shadow-xl">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
					<span className="text-white/90 text-sm font-medium">
						オンライン ({users.length})
					</span>
				</div>
				
				<div className="space-y-2">
					{users.map((user) => (
						<div
							key={user.userId}
							className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
						>
							{/* ユーザーアバター */}
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg relative"
								style={{ backgroundColor: user.userColor }}
							>
								{user.userName.charAt(0)}
								{/* 編集中インジケーター */}
								{user.isEditing && (
									<div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
								)}
							</div>
							
							{/* ユーザー情報 */}
							<div className="flex-1 min-w-0">
								<div className="text-white/90 text-sm font-medium truncate">
									{user.userName}
								</div>
								{user.isEditing && (
									<div className="text-yellow-300/80 text-xs animate-pulse">
										編集中...
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}