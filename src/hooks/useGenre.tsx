interface GenresInterface {
  id: number;
  name: string;
}

const useGenre = (selectGenres: any) => {
  if (selectGenres.length < 1) return "";

  const genreiD = selectGenres.map((g: GenresInterface) => g.id);
  return genreiD.reduce((acc: any, curr: any) => acc + "," + curr);
};

export default useGenre;
