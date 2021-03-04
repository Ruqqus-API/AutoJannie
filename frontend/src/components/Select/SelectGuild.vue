<template>
  <t-rich-select
    :fetch-options="fetchOptions"
    placeholder="select an option"
    value-attribute="full_name"
    text-attribute="full_name"
    :minimum-input-length="1"
    :fixedClasses="{
        wrapper: 'relative',
        buttonWrapper: 'inline-block relative w-full',
        selectButton: 'w-full flex text-left justify-between items-center px-2 py-2 text-gray-900 transition duration-100 ease-in-out border border-transparent rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        selectButtonLabel: 'block truncate',
        selectButtonPlaceholder: 'block truncate',
        selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
        selectButtonClearButton: 'rounded flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 w-5 h-5 transition duration-100 ease-in-out',
        selectButtonClearIcon: 'fill-current h-3 w-3',
        dropdown: 'absolute w-full z-10 -mt-1 border-b border-l border-r rounded-b-sm shadow-sm z-10',
        dropdownFeedback: '',
        loadingMoreResults: '',
        optionsList: 'overflow-auto',
        searchWrapper: 'inline-block w-full',
        searchBox: 'inline-block w-full',
        optgroup: '',
        option: 'cursor-pointer',
        disabledOption: 'opacity-50 cursor-not-allowed',
        highlightedOption: 'cursor-pointer',
        selectedOption: 'cursor-pointer',
        selectedHighlightedOption: 'cursor-pointer',
        optionContent: '',
        optionLabel: 'truncate block',
        selectedIcon: 'fill-current h-4 w-4',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      }"
      :classes="{
        wrapper: '',
        buttonWrapper: '',
        selectButton: 'bg-light border-gray-300',
        selectButtonLabel: '',
        selectButtonPlaceholder: 'text-gray-400',
        selectButtonIcon: 'text-gray-600',
        selectButtonClearButton: 'hover:bg-purple-100 text-gray-600',
        selectButtonClearIcon: '',
        dropdown: 'bg-white border-gray-300',
        dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
        loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
        optionsList: '',
        searchWrapper: 'p-2 placeholder-gray-400',
        searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300',
        optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
        option: '',
        disabledOption: '',
        highlightedOption: 'bg-gray-100',
        selectedOption: 'font-bold bg-gray-100 bg-purple-500 text-sm text-white',
        selectedHighlightedOption: 'bg-gray-100 bg-purple-600 font-bold text-white',
        optionContent: 'flex justify-between items-center px-3 py-2',
        optionLabel: '',
        selectedIcon: '',
        enterClass: '',
        enterActiveClass: 'opacity-0 transition ease-out duration-100',
        enterToClass: 'opacity-100',
        leaveClass: 'transition ease-in opacity-100',
        leaveActiveClass: '',
        leaveToClass: 'opacity-0 duration-75'
      }"
  >
    <template
      slot="label"
      slot-scope="{ className, option }"
    >
      <div class="flex items-center">
        <span class="flex-shrink-0">
          <img
            class="w-5 h-5 rounded"
            :src="option.raw.owner.avatar_url"
          >
        </span>
        <div class="flex flex-col ml-2 text-gray-800">
          <span class="font-medium">{{ option.raw.full_name }}</span>
        </div>
      </div>
    </template>
  </t-rich-select>
</template>

<script>
export default {
  methods: {
    fetchOptions (q) {
      return fetch(`https://api.github.com/search/repositories?q=${q}&type=public`)
        .then((response) => response.json())
        .then((data) => ({ results: data.items }))
    }
  }
}
</script>