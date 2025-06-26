import { fetchLibs } from './fetchLibs.js'

/**
 * @return {Promise<Array<{
 *      lib_id: number,
 *      lib_id_activite: string,
 *      lib_niveau: number,
 *      lib_libelle: string,
 *      lib_note: string,
 *      lib_note: string,
 *      lib_genre: string,
 *      lib: string,
 *      lib: string,
 *      id: string,
 * }>>}
 */
export const fetchThemes = async act => {
  const libs = await fetchLibs(act)

  const themes = await Promise.all(
    libs.libs.map(async lib => {
      if (libs.themes.hasOwnProperty(`niv_${lib.lib_niveau}`)) {
        return libs.themes[`niv_${lib.lib_niveau}`].map(theme => ({
          ...lib,
          ...theme
        }))
      }
      const body = new FormData()
      body.append('acti', act)
      body.append('level', lib.lib_niveau)
      body.append('ids', lib.lib_id)

      const resp = await fetch(
        'https://tools.cofrac.fr/site/content/french/pages/easysearch/ajax/load_theme.php',
        {
          method: 'POST',
          body
        }
      )
      const data = await resp.json()

      if (false === data.themes.hasOwnProperty(`niv_${lib.lib_niveau}`)) {
        console.warn(
          `No themes found for level ${lib.lib_niveau} in activity ${act}`
        )
        return []
      }

      return (
        data.themes[`niv_${lib.lib_niveau}`]?.map(theme => ({
          ...lib,
          ...theme
        })) ?? []
      )
    })
  )

  return themes.flat()
}
