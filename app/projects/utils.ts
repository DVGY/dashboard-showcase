import { baseApiURL } from '@/config/envs';
import { Project } from '@/types/resourceResponses';

export const deleteProject = async (id: string) => {
  const endpoint = new URL(`${baseApiURL}/projects/${id}`);

  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const project = await res.json();
  return project as Project;
};
