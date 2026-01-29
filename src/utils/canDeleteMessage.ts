export function canDeleteMessage({
  messageSenderId,
  currentUserId,
  isGroup,
  admins,
}: {
  messageSenderId: string;
  currentUserId: string;
  isGroup: boolean;
  admins: string[];
}) {
  if (messageSenderId === currentUserId) return true;
  if (isGroup && admins.includes(currentUserId)) return true;
  return false;
}