import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../utils';
import { Projects } from '@/types/resourceResponses';
import { useSearchParams } from 'next/navigation';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onMutate: (id) => {
      const searchText = searchParams.get('name_like');
      let alphaSort = searchParams.get('_order');
      if (alphaSort) {
        alphaSort = null;
      }

      queryClient.setQueryData(
        ['projects', { searchText, alphaSort }],
        (prev: Projects) => prev.filter((e) => e.id !== id)
      );
    },
  });

  return mutation;
};
