const filterBySearch = (jobs, searchTerm) => {
  if (!searchTerm) return jobs;
  const lowerSearch = searchTerm.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(lowerSearch) ||
      job.company?.toLowerCase().includes(lowerSearch),
  );
};

const filterByExperience = (jobs, experience) => {
  if (experience === "all") return jobs;
  return jobs.filter((job) =>
    job.experience?.toLowerCase().includes(experience),
  );
};

const sortByDate = (jobs, sortOrder) => {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
};

export {filterBySearch, filterByExperience, sortByDate};