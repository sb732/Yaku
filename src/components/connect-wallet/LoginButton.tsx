import { Button } from "konsta/react";
import { IconWallet } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

export const LoginButton = ({
  handleClick,
}: {
  handleClick: MouseEventHandler<HTMLElement>;
}) => {
  return (
    <Button
      className="md:flex text-white bg-btn-subtle focus:ring-4 focus:outline-none !focus:ring-btn-subtle/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center capitalize inline-flex items-center hover:bg-btn-subtle/40 focus:ring-gray-600 me-2 mb-2 ml-1"
      large
      colors={{ fillBgIos: 'btn-subtle', fillBgMaterial: 'btn-subtle' }}
      onClick={handleClick}
    >
      <IconWallet className="mr-1" stroke={1.5} size="1.3rem" />
      Register/Login
    </Button>
  );
};