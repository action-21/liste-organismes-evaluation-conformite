import { writeFileSync } from 'fs'
import { fetchThemes } from './fetchThemes.js'
import activites from './activites.json' with { type: 'json' }

const build = async () => {
  const data = await Promise.all(
    activites.map(async activite => {
      return await fetchThemes(activite.code)
    })
  )

  const themes = data.filter((object, index) => {
    return data.findIndex(item => item.id === object.id) === index
  })

  writeFileSync('./themes.json', JSON.stringify(themes, null, 2))
}

build().catch(console.error)
