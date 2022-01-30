<template>
   <div class="p-2">
      <div class="field">
         <div class="control">
            <input
               @input="onInput($event)"
               placeholder="Type here..."
               type="text"
               class="input"
            />
         </div>
      </div>
      <Table
         :content="tableContent"
         :config="tableConfig"
         @select="getItemToChange"
      />
      <ListItemCreator
         :row="itemToChange"
         @closeModal="setVisibilityOfItem"
         @emitChangedItem="setChangedItem"
      />
   </div>
</template>
<script>
import Table from '@/components/Table.vue'
import ListItemCreator from '@/views/List/components/ListItemCreator.vue'
import { computed, onMounted, reactive } from 'vue'
import { filterList, mapList } from './listHelper'
import dummy from '@/assets/dummy.json'
import timeout from 'q'
export default {
   components: { Table, ListItemCreator },
   setup() {
      const tableConfig = {
         columns: [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'cords_display', header: 'Cords' },
            { key: 'tags_display', header: 'Tags' },
            { key: 'status', header: 'Status' }
         ]
      }
      const state = reactive({
         items: [],
         initLoading: true,
         search: '',
         timeout
      })
      const tableContent = computed(() =>
         state.items.filter(item => filterList(item, state.search)).map(mapList)
      )
      const itemToChange = reactive({
         item: {},
         isVisible: false
      })
      const onInput = ({ target: { value } }) => {
         clearTimeout(timeout)
         state.timeout = setTimeout(
            () => (state.search = value.toLowerCase().trim()),
            500
         )
      }
      const mockRequest = () => {
         return new Promise(resolve => {
            setTimeout(() => {
               state.items = dummy
               resolve()
            }, 500)
         })
      }
      const getItemToChange = item => {
         itemToChange.item = item
         itemToChange.isVisible = true
      }
      const setVisibilityOfItem = visibility => {
         itemToChange.isVisible = visibility
      }
      const setChangedItem = changedItem => {
         state.items.forEach(stateItem => {
            if (stateItem.id === changedItem.value.id) {
               stateItem.name = changedItem.value.name
               stateItem.status = changedItem.value.status
            }
         })
      }
      onMounted(async () => {
         await mockRequest()
         state.loading = false
      })
      return {
         tableContent,
         tableConfig,
         onInput,
         getItemToChange,
         itemToChange,
         setVisibilityOfItem,
         setChangedItem
      }
   }
}
</script>
