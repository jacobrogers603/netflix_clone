import React from "react";

interface NavbarItemProps {
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {props.label}
        </div>
    )
}

export default NavbarItem;