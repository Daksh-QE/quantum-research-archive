import React from "react";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  const tagClass = `tag-${tag.toLowerCase()}`;
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded font-medium text-xs ${tagClass}`}
    >
      {tag}
    </span>
  );
}
