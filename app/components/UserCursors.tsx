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

interface UserCursorsProps {
	users: User[];
}

export default function UserCursors({ users }: UserCursorsProps) {
	return (
		<>
			{users.map((user) => {
				if (!user.cursorPosition) return null;

				return (
					<div
						key={user.userId}
						className="fixed pointer-events-none z-40 transition-all duration-100 ease-out"
						style={{
							left: user.cursorPosition.x,
							top: user.cursorPosition.y,
							transform: "translate(-2px, -2px)",
						}}
					>
						{/* カーソルアイコン */}
						<div className="relative">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								className="drop-shadow-lg"
							>
								<path
									d="M5.5 3.5L19.5 12L12 14.5L9.5 21L5.5 3.5Z"
									fill={user.userColor}
									stroke="white"
									strokeWidth="1.5"
								/>
							</svg>
							
							{/* ユーザー名ラベル */}
							<div
								className="absolute top-5 left-2 px-2 py-1 rounded-lg text-xs font-medium text-white shadow-lg transform transition-all duration-200 opacity-0 group-hover:opacity-100"
								style={{ backgroundColor: user.userColor }}
							>
								{user.userName}
								<div
									className="absolute -top-1 left-2 w-2 h-2 rotate-45"
									style={{ backgroundColor: user.userColor }}
								></div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}