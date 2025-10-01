import React from "react";
import Image from "next/image";
import "./Icon.scss";

interface IconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "28";
  alt?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  size = "md",
  alt,
}) => {
  const iconPath = `/icons/${name}.svg`;
  const altText = alt || `${name} icon`;

  return (
    <div className={`icon icon--${size} ${className}`.trim()}>
      <Image
        src={iconPath}
        alt={altText}
        width={getIconSize(size)}
        height={getIconSize(size)}
        className="icon__image"
        draggable={false}
      />
    </div>
  );
};

const getIconSize = (size: string): number => {
  switch (size) {
    case "sm":
      return 16;
    case "md":
      return 24;
    case "lg":
      return 32;
    case "xl":
      return 48;
    case "28":
      return 28;
    default:
      return 24;
  }
};
