import { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Avatar } from "../common/Avatar";
import Modal from "../../ui/Modal";
import { showSuccess, showError } from "../../../utils/toast";
import { useForm } from "../../../hooks/useForm";
import { required } from "../../../utils/validators";
import {
  updateGroupChatApi,
  addGroupMemberApi,
  removeGroupMemberApi,
  leaveGroupApi,
  discoverUsersApi,
} from "../../../api/chat.api";
import { uploadToImageKit } from "../../../api/imagekit.upload";
import { getImageKitAuthApi } from "../../../api/imagekit.api";
import { useImageInput } from "../../../hooks/useImageInput";
import { useAppDispatch } from "../../../hooks/redux";
import { selectChat, updateChat } from "../../../features/chat/chatSlice";
import type { ChatUser } from "../../../features/chat/chat.types";
import { getErrorMessage } from "../../../utils/getErrorMessage";

type UpdateGroupPayload = {
  name: string;
  description?: string;
  image?: { key: string; url: string };
  removeOldImage?: boolean;
};

export const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat.selectedChat);
  const currentUser = useAppSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "add" | "remove" | "leave" | "delete" | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<ChatUser[]>([]);

  const editForm = useForm({
    name: { value: chat?.name || "", validators: [required("Group name")] },
    description: { value: chat?.description || "", validators: [] },
  });

  const image = useImageInput({
    initialUrl: chat?.image?.url,
    required: false,
  });

  // fetch available users
  useEffect(() => {
    if (modalType === "add" && chat) {
      discoverUsersApi()
        .then((res) => {
          // exclude users already in the group
          const existingIds = chat.members.map(m => m._id);
          const filtered = res.data.users.filter((u: ChatUser) => !existingIds.includes(u._id));
          setAvailableUsers(filtered);
        })
        .catch(() => showError("Failed to fetch users"));
    }
  }, [modalType, chat?.members]);

  if (!chat || !currentUser) return null;

  const isAdmin =
  chat.type === "group" &&
  chat.admins?.some((a) =>
    typeof a === "string"
      ? a === currentUser._id
      : a._id === currentUser._id
  );

  const otherUser = chat.type === "one_to_one" ? chat.members.find((m) => m._id !== currentUser._id) : null;
  const title = chat.type === "group" ? chat.name : otherUser?.name ?? "Unknown user";
  const avatar = chat.type === "group" ? chat.image?.url : otherUser?.profilePicture?.url;

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleConfirm = async () => {
    try {
      if (modalType === "edit") {
        if (!editForm.validateForm() || !image.validate()) return;

        const payload: UpdateGroupPayload  = {
          name: editForm.values.name,
          description: editForm.values.description,
        };

        // ImageKit upload 
        if (image.file) {
          const auth = await getImageKitAuthApi();
          const uploaded = await uploadToImageKit(image.file, auth.data ?? auth);
          payload.image = { key: uploaded.fileId, url: uploaded.url };
        } else if (image.removed && chat?.image?.key) {
          payload.removeOldImage = true;
        }

        // get updated chat from server
        const res = await updateGroupChatApi(chat._id, payload);
        const updatedChat = res.data.chat;

        dispatch(updateChat(updatedChat));   // sidebar list
        dispatch(selectChat(updatedChat));  // header + open chat

        showSuccess("Group updated successfully 🎉");
      }

      if (modalType === "add") {
        if (!selectedUsers.length) return showError("Select at least one user");

        const res = await addGroupMemberApi(chat._id, selectedUsers);
        const updatedChat = res.data.chat;

        dispatch(updateChat(updatedChat)); // sidebar list
        dispatch(selectChat(updatedChat)); //currently open chat
        showSuccess("Member(s) added");
      }

      if (modalType === "remove") {
        if (!selectedUsers.length) return showError("Select at least one member");
        const updatedChat = { ...chat };

        for (const userId of selectedUsers) {
          await removeGroupMemberApi({
            chatRoomId: chat._id,
            userIdToRemove: userId,
          });

          // remove from member list locally
          updatedChat.members = updatedChat.members.filter(m => m._id !== userId);
          updatedChat.admins = updatedChat?.admins?.filter(a => a._id !== userId);
        }

        dispatch(updateChat(updatedChat));   // sidebar
        dispatch(selectChat(updatedChat));   // open chat header
        showSuccess("Member(s) removed");
      }

      if (modalType === "leave") {
        await leaveGroupApi(chat._id);
        showSuccess("Left group");
      }

      setSelectedUsers([]);
      setModalType(null);
    } catch (err: unknown) {
      showError(getErrorMessage(err) || "Something went wrong");
    }
  };

  return (
    <>
      <div className="h-16 px-4 flex items-center justify-between border-b border-gray-700 bg-[#071a29]">
        <div className="flex items-center gap-3">
          <Avatar src={image.preview || avatar} name={title} />
          <div>
            <div className="font-semibold text-white">{title}</div>
            <div className="text-xs text-gray-400">
              {chat.type === "group" ? `${chat.members.length} members` : "Online"}
            </div>
          </div>
        </div>

        {chat.type === "group" && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded hover:bg-gray-700 text-white text-xl">⋮</button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#0d2538] border border-gray-700 rounded shadow-lg z-50">
                {isAdmin && <>
                  <button onClick={() => { setModalType("edit"); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-white">Edit Group</button>
                  <button onClick={() => { setModalType("add"); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-white">Add Members</button>
                  <button onClick={() => { setModalType("remove"); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-white">Remove Members</button>
                  
                </>}
                <button onClick={() => { setModalType("leave"); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 text-sm text-white">Leave Group</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={!!modalType}
        title={modalType === "edit" ? "Edit Group" :
               modalType === "add" ? "Add Members" :
               modalType === "remove" ? "Remove Members" : "Leave Group"}
        confirmText={modalType === "edit" ? "Save" :
                     modalType === "add" ? "Add" :
                     modalType === "remove" ? "Remove" : "Leave"}
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setModalType(null)}
      >
        {modalType === "edit" && (
          <div className="space-y-4">
            <input
              name="name"
              value={editForm.values.name}
              onChange={editForm.handleChange}
              className="w-full px-3 py-2 bg-transparent border rounded text-white"
            />
            <textarea
              name="description"
              value={editForm.values.description}
              onChange={editForm.handleChange}
              className="w-full px-3 py-2 bg-transparent border rounded text-white"
            />
            <div className="space-y-2">
              <label className="text-sm text-white">Group Image</label>
              {!image.preview ? (
                <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-white text-gray-300">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && image.selectImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="flex items-center gap-3">
                  <img src={image.preview} className="w-20 h-20 rounded-full object-cover" />
                  <button onClick={image.removeImage} className="text-red-400 text-sm">Remove</button>
                </div>
              )}
            </div>
          </div>
        )}

        {modalType === "add" && (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {availableUsers.map(u => (
              <label key={u._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => toggleUser(u._id)}
                />
                <span className="text-white font-medium">
                  {u.name}
                </span>
              </label>
            ))}
          </div>
        )}


        {modalType === "remove" && (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {chat.members
              .filter(member => {
                if (member._id === currentUser?._id) return false; // can't remove self

                const isMemberAdmin = chat.admins?.some(a => a._id === member._id);

                // if only 1 admin exists → cannot remove them
                if (isMemberAdmin && chat?.admins?.length === 1) return false;

                return true;
              })
              .map(member => (
                <label key={member._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(member._id)}
                    onChange={() => toggleUser(member._id)}
                  />
                  <span className="text-white font-medium">
                    {member.name}
                    {chat?.admins?.some(a => a._id === member._id) && " (admin)"}
                  </span>
                </label>
              ))}
          </div>
        )}

        {modalType === "leave" && <p className="text-gray-300">Are you sure you want to leave this group?</p>}
      </Modal>
    </>
  );
};
