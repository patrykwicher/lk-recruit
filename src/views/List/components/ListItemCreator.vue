<template>
   <transition name="fade" mode="in-out">
      <div class="modal is-active" v-if="row.isVisible">
         <div class="modal-background" @click="closeModal"></div>
         <div class="modal-content p-5 has-border">
            <div class="field">
               <label class="label">Name</label>
               <div class="control">
                  <input
                     type="text"
                     class="input"
                     placeholder="Name"
                     v-model="item.name"
                  />
               </div>
            </div>
            <div class="field">
               <label class="label">Status</label>
               <div class="control">
                  <div class="select">
                     <select v-model="item.status">
                        <option selected disabled>{{ item.status }}</option>
                        <option>unverified</option>
                        <option>verified</option>
                     </select>
                  </div>
               </div>
            </div>
            <div class="field is-grouped is-grouped-right">
               <div class="control">
                  <button
                     class="button is-primary"
                     @click="emitChangedItem"
                     :disabled="isSubmitDisabled"
                  >
                     Submit
                  </button>
               </div>
               <div class="control">
                  <button class="button" @click="closeModal">Cancel</button>
               </div>
            </div>
         </div>
         <button
            class="modal-close is-large"
            aria-label="close"
            @click="closeModal"
         ></button>
      </div>
   </transition>
</template>
<script>
import { toRefs, computed } from 'vue'

export default {
   props: {
      row: {
         type: Object,
         default: () => ({})
      }
   },
   emits: ['closeModal', 'emitChangedItem'],
   setup(props, { emit }) {
      const { item } = toRefs(props.row)
      const { isVisible } = toRefs(props.row)

      const isSubmitDisabled = computed(() => {
         if (item.value.name === undefined) {
            return
         } else {
            if (item.value.name.trim().length === 0) {
               return true
            } else {
               return false
            }
         }
      })
      const closeModal = () => {
         emit('closeModal', false)
      }
      const emitChangedItem = () => {
         emit('emitChangedItem', item)
         closeModal()
      }
      return { closeModal, item, isVisible, emitChangedItem, isSubmitDisabled }
   }
}
</script>
<style lang="scss" scoped></style>
