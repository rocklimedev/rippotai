// app/team/TeamMember.jsx
import Image from "next/image";
import styles from "./team.module.css";

export default function TeamMember({
  name,
  role,
  bio,
  image,
  category, // optional – for future badges or styling
}) {
  return (
    <div className={styles.teamMemberCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={image || "/team/placeholder.jpg"}
          alt={`${name} – ${role}`}
          width={400}
          height={500}
          className={styles.teamMemberImg}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Optional overlay (kept clean for future use) */}
        {category && (
          <div className={styles.teamOverlay}>
            <span className={styles.categoryBadge}>{category}</span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className={styles.memberInfo}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        {bio && <p className={styles.bio}>{bio}</p>}
      </div>
    </div>
  );
}
