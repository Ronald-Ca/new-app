import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const iconMap: Record<string, { Icon: React.ComponentType<{ size?: number }>, label: string }> = {
  whatsapp: { Icon: IoLogoWhatsapp, label: "WhatsApp" },
  instagram: { Icon: RiInstagramFill, label: "Instagram" },
  github: { Icon: FaGithub, label: "GitHub" },
  linkedin: { Icon: FaLinkedin, label: "LinkedIn" },
  email: { Icon: MdEmail, label: "Email" },
};