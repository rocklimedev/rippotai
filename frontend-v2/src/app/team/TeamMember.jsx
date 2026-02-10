// app/team/TeamMember.jsx
import Image from "next/image";

export default function TeamMember({ name, role, image, category }) {
  const fallback = "/team/placeholder.jpg";
  const src = image && image.trim() ? image : fallback;

  return (
    <div className="team-member-card">
      <div className="team-image-wrapper">
        <Image
          src={src}
          alt={`${name} – ${role}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="team-member-img"
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/"
        />

        {category && (
          <div className="team-overlay">
            <span className="category-badge">{category}</span>
            <h3>{name}</h3>
            <div className="role">{role}</div>
          </div>
        )}
      </div>

      {/* Shown when not hovering */}
      <div className="team-member-info">
        <h3 className="name">{name}</h3>
        <p className="role">{role}</p>
      </div>
    </div>
  );
}
