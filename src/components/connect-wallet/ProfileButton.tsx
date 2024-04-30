import { Button, Icon } from "konsta/react";
import { MouseEventHandler } from "react";
import YakuIcon from "../Icons/YakuIcon";

export const ProfileButton = ({
  avatar,
  handleClick,
}: {
  avatar:  string;
  handleClick: MouseEventHandler<HTMLElement>;
}) => {
  const iconContent = <YakuIcon cssClass='h-12 w-12 !rounded-full object-cover yaku-icon' icon={avatar} />;
  return (
    <Button
      className="profile-button md:flex text-white focus:ring-4 focus:outline-none !focus:ring-btn-subtle/50 font-medium !rounded-full text-sm !p-0 h-auto text-center capitalize inline-flex items-center focus:ring-gray-600 "
      large
      clear
      onClick={handleClick}
    >
      <Icon ios={iconContent} material={iconContent} />
     
    </Button>
  );
};