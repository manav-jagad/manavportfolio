import type { CSSProperties } from "react";
import type { PortfolioProject } from "@/data/portfolio";

type ProjectPreviewProps = {
  project: PortfolioProject;
  compact?: boolean;
};

export default function ProjectPreview({
  project,
  compact = false,
}: ProjectPreviewProps) {
  const style = {
    "--preview-start": project.palette[0],
    "--preview-mid": project.palette[1],
    "--preview-end": project.palette[2],
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`project-preview ${compact ? "project-preview-compact" : ""}`}
    >
      <div className="project-preview-glow" />
      <div className="project-preview-grid" />

      <div className="project-preview-window">
        <div className="project-preview-topbar">
          <span className="project-preview-pill">{project.previewLabel}</span>
          <span className="project-preview-domain">{project.domain}</span>
        </div>

        <div className="project-preview-content">
          <div className="project-preview-header">
            <div className="project-preview-heading" />
            <div className="project-preview-subheading" />
          </div>

          <div className="project-preview-chips">
            {project.focus.slice(0, 3).map((item) => (
              <span key={item} className="project-preview-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="project-preview-columns">
            <div className="project-preview-card">
              <div className="project-preview-card-line" />
              <div className="project-preview-card-line short" />
            </div>
            <div className="project-preview-card muted">
              <div className="project-preview-card-line" />
              <div className="project-preview-card-line short" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
