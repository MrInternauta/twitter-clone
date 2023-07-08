import Image from "next/image";
import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

interface UserBioProps {
  userId: string;
}

const UserHero: React.FC<UserBioProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div className="bg-neutral-700 h-44 relative">
      {fetchedUser?.coverImage && (
        <Image
          src={fetchedUser?.coverImage}
          fill
          alt="Cover Image"
          style={{
            objectFit: "cover",
          }}
        />
      )}
      <div className=" absolute -bottom-16 left-4">
        <Avatar userId={fetchedUser?.id} isLarge hasBorder />
      </div>
    </div>
  );
};
export default UserHero;
