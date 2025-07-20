"use client";
import { useState } from "react";

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => Promise<void>;
}

export default function CommentModal({ open, onClose, onSubmit }: CommentModalProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(comment);
      setComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          disabled={loading}
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-amber-800 mb-4">今お店にいますか？</h2>
        <p className="mb-4 text-[#162b42]">他のご贔屓さんにコメントを残しましょう！</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={3}
            placeholder="一言コメントを入力してください"
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={loading}
            maxLength={100}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
              disabled={loading || !comment.trim()}
            >
              コメント送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 