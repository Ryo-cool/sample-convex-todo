import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ユーザーカラーの配列
const USER_COLORS = [
	"#FF6B6B", // 赤
	"#4ECDC4", // ティール
	"#45B7D1", // 青
	"#96CEB4", // 緑
	"#FECA57", // 黄色
	"#FF9FF3", // ピンク
	"#54A0FF", // 青紫
	"#5F27CD", // 紫
];

// ユニークなユーザーIDを生成
function generateUserId(): string {
	return `user_${Math.random().toString(36).substring(2, 15)}`;
}

// ランダムなユーザー名を生成
function generateUserName(): string {
	const adjectives = ["素敵な", "クールな", "スマートな", "エレガントな", "モダンな"];
	const nouns = ["ユーザー", "開発者", "デザイナー", "クリエイター", "アーティスト"];
	const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${adj}${noun}`;
}

// ランダムなカラーを選択
function getRandomColor(): string {
	return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}

export function usePresence() {
	const [userId] = useState(() => generateUserId());
	const [userName] = useState(() => generateUserName());
	const [userColor] = useState(() => getRandomColor());
	const [isEditing, setIsEditing] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState<Id<"todos"> | undefined>();
	// const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>();

	const updatePresence = useMutation(api.presence.updatePresence);
	const removePresence = useMutation(api.presence.removePresence);
	const cleanupOldPresence = useMutation(api.presence.cleanupOldPresence);
	const activeUsers = useQuery(api.presence.getActiveUsers);

	const presenceUpdateRef = useRef<NodeJS.Timeout | undefined>(undefined);

	// プレゼンス情報の定期更新
	const updatePresenceInfo = useCallback(() => {
		updatePresence({
			userId,
			userName,
			userColor,
			isEditing,
			editingTodoId,
			// カーソル位置の共有は一時的にオフ
			// cursorPosition,
		});
	}, [userId, userName, userColor, isEditing, editingTodoId, updatePresence]);

	// 編集状態の設定
	const setEditingStatus = useCallback((editing: boolean, todoId?: Id<"todos">) => {
		setIsEditing(editing);
		setEditingTodoId(todoId);
	}, []);

	// カーソル位置の更新（カーソル共有オフ中）
	// const updateCursorPosition = useCallback((x: number, y: number) => {
	// 	setCursorPosition({ x, y });
	// }, []);

	// マウスムーブイベントリスナー（カーソル共有は一時的にオフ）
	// useEffect(() => {
	// 	const handleMouseMove = (e: MouseEvent) => {
	// 		updateCursorPosition(e.clientX, e.clientY);
	// 	};

	// 	document.addEventListener("mousemove", handleMouseMove);
	// 	return () => document.removeEventListener("mousemove", handleMouseMove);
	// }, [updateCursorPosition]);

	// プレゼンス情報の定期更新
	useEffect(() => {
		// 初回更新
		updatePresenceInfo();

		// 30秒ごとに更新 + 5分ごとにクリーンアップ
		presenceUpdateRef.current = setInterval(() => {
			updatePresenceInfo();
			// 5分に1回クリーンアップ実行
			if (Math.random() < 0.1) { // 10%の確率で実行（負荷分散）
				cleanupOldPresence();
			}
		}, 30000);

		return () => {
			if (presenceUpdateRef.current) {
				clearInterval(presenceUpdateRef.current);
			}
		};
	}, [updatePresenceInfo, cleanupOldPresence]);

	// プレゼンス情報の即座の更新（編集状態が変わった時）
	useEffect(() => {
		updatePresenceInfo();
	}, [isEditing, editingTodoId, updatePresenceInfo]);

	// コンポーネントのアンマウント時にプレゼンスを削除
	useEffect(() => {
		// ページが閉じられる/更新される時にプレゼンスを削除
		const handleBeforeUnload = () => {
			removePresence({ userId });
		};

		// ページの可視性が変わった時（タブ切り替えなど）
		const handleVisibilityChange = () => {
			if (document.hidden) {
				removePresence({ userId });
			} else {
				// タブが再び表示された時にプレゼンスを復活
				updatePresenceInfo();
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			removePresence({ userId });
		};
	}, [userId, removePresence, updatePresenceInfo]);

	// 他のユーザー（自分以外）を取得
	const otherUsers = activeUsers?.filter(user => user.userId !== userId) || [];

	return {
		userId,
		userName,
		userColor,
		activeUsers: otherUsers,
		setEditingStatus,
		// updateCursorPosition, // カーソル共有オフ中
		isEditing,
		editingTodoId,
	};
}