/**
 * @return {Promise<{
 *    libs: Array<{
 *      lib_id: number,
 *      lib_id_activite: string,
 *      lib_niveau: number,
 *      lib_libelle: string,
 *      lib_note: string,
 *      lib_note: string,
 *      lib_genre: string
 *    }>,
 *   themes: { [x: string]: Array<{ id: number, lib: string }> }
 * }>}
 */
export const fetchLibs = async act => {
  const body = new FormData()
  body.append('acti', act)

  const resp = await fetch(
    'https://tools.cofrac.fr/site/content/french/pages/easysearch/ajax/load_activite.php',
    {
      method: 'POST',
      body
    }
  )
  return await resp.json()
}
