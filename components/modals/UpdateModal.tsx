import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import React, { useCallback, useEffect, useState } from "react";
import useUpdateModal from "@/hooks/useUpdateModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import Modal from "../Modal";
import Input from "../Input";
import { ImageUpload } from "../ImageUpload";

const UpdateModal: React.FC<any> = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetcherUser } = useUser(currentUser?.id);
  const updateModal = useUpdateModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.CoverImage);
    setName(currentUser?.name);
    setuserName(currentUser?.userName);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.CoverImage,
    currentUser?.name,
    currentUser?.userName,
    currentUser?.bio,
  ]);

  const [isLoading, setisLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setisLoading(true)
      await axios.patch("/api/edit", {
        userName,
        name,
        profileImage,
        coverImage,
        bio,
      });
      mutateFetcherUser();
      toast.success("User updated!");
      updateModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setisLoading(false);
    }
  }, [userName, name, profileImage, coverImage, bio, mutateFetcherUser, updateModal]);

  const bodyContent  = (
    <div className="flex flex-col gap-4">
      <ImageUpload
      value={profileImage}
      disabled={isLoading}
      onChange={img=>setProfileImage(img)}
      label="Upload profile image"
      />

    <ImageUpload
      value={coverImage}
      disabled={isLoading}
      onChange={img=>setCoverImage(img)}
      label="Upload cover image"
      />
      
      <Input
      placeholder="Name"
      onChange={(e)=>setName(e.target.value)}
      value={name}
      disabled={isLoading}
      />
      <Input
      placeholder="UserName"
      onChange={(e)=>setuserName(e.target.value)}
      value={userName}
      disabled={isLoading}
      />
      <Input
      placeholder="Bio"
      onChange={(e)=>setBio(e.target.value)}
      value={bio}
      disabled={isLoading}
      />
    </div>
  );

  return (    <Modal
    disabled={isLoading}
    isOpen={updateModal.isOpen}
    title="Edit your profile"
    actionLabel="Save"
    onClose={updateModal?.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
  ></Modal>);
};
export default UpdateModal;
