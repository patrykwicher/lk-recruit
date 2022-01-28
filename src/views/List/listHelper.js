export const filterList = (item, search) => {
   const keysToFilter = ['name', 'status', 'img', 'tags']
   return Object.entries(item).some(
      ([key, value]) => {
         if (search[0] === 'v') {
            if (key === 'status' && value[0] !== 'u') {
               return keysToFilter.includes(key) && value.toString().toLowerCase().includes(search)
            }
         } else {
            return keysToFilter.includes(key) && value.toString().toLowerCase().includes(search)
         }
      }
   )
}
export const mapList = item => {
   const tags_display = item.tags.join(', ')
   const cords_display = item.cords.join(', ')
   return { ...item, tags_display, cords_display }
}
