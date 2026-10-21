import "server-only";
import { projects } from "@/data/projects";

/**
 * Data Access Layer (DAL) for Projects & Case Studies.
 * Guaranteed to only execute on the server.
 */

/**
 * Retrieve all projects.
 * @returns {Array} All project entities.
 */
export async function getAllProjects() {
  return projects;
}

/**
 * Retrieve a project by its unique slug.
 * @param {string} slug Unique project identifier.
 * @returns {Object|null} The matching project or null.
 */
export async function getProjectBySlug(slug) {
  if (!slug) return null;
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Retrieve all static slugs for generateStaticParams.
 * @returns {Array<{ slug: string }>} Array of slug params.
 */
export async function getAllProjectSlugs() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * Retrieve related projects for recommendation modules.
 * @param {string} currentSlug Current project slug to exclude.
 * @param {string} category Category to prioritize.
 * @param {number} limit Maximum count of similar items.
 * @returns {Array} Similar project items.
 */
export async function getSimilarProjects(currentSlug, category, limit = 3) {
  return projects
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, limit);
}
