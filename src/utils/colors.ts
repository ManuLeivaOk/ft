const colorMap: Record<string, string> = {
  Naranja: 'bg-orange-400  border-orange-200 sm:max-w-[425px]',
  Azul: 'bg-blue-400 text-white-900 border-blue-200 sm:max-w-[425px]',
  Rosa: 'bg-pink-400 border-pink-200 sm:max-w-[425px]',
  Verde: 'bg-green-400 border-green-200 sm:max-w-[425px]',
  Rojo: 'bg-red-400 border-red-200 sm:max-w-[425px]',
  Amarillo: 'bg-yellow-400 border-red-200 sm:max-w-[425px]',
  Morado: 'bg-purple-400 text-white-900 border-red-200 sm:max-w-[425px]',
  Gris: 'bg-gray-400 text-white-900 border-red-200 sm:max-w-[425px]',
  Negro: 'bg-stone-900 text-white-900 border-red-200 sm:max-w-[425px]',
  Blanco: 'bg-neutral-50 text-black-900 border-red-200 sm:max-w-[425px]',
  default: 'bg-gray-400 text-white-900 border-gray-200 sm:max-w-[425px]',
}

export const getColorByTeam = (team: string) => {
  return colorMap[team] || colorMap.default
}