<template>
    <div class="">
        <div class="col-span-full">
            <label
                :for="name"
                class="block text-sm font-medium text-gray-700"
            >{{ label }}</label
            >
            <div
                class="mt-2 flex rounded-lg border border-dashed border-gray-900/25 px-6 py-6"
                @dragover.prevent
                @drop.prevent="handleDragDrop"
            >
                <div class="sm:flex space-y-4 sm:space-y-0 justify-between items-center w-full">
                    <div class="flex text-sm leading-6 text-gray-600 space-x-4">
                        <div>
                            <p class="w-10 h-10 rounded-full p-1 bg-gray-100 inline-flex justify-center items-center">
                                <VueFeather type="upload-cloud" class="text-blue-500 w-5" />
                            </p>
                        </div>
                        <div>
                            <div class="inline-flex items-center">
                                <label
                                    :for="name"
                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                >
                                    <span>Click</span>
                                    <input
                                        :id="name"
                                        :name="name"
                                        type="file"
                                        class="sr-only"
                                        :accept="accept"
                                        v-bind="$attrs"
                                        required
                                        @input="handleInput"
                                        ref="fileInput"
                                    />
                                </label>
                                <p class="pl-1 font-medium">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-500">{{ help }}</p>
                        </div>
                    </div>
                    <button 
                        @click="clickButton" type="button"
                        class="text-blue-600 px-4 py-2 text-sm font-medium bg-gray-50 rounded-md focus:outline-none"
                    >
                        Choose File
                    </button>
                </div>
            </div>
        </div>

        <div v-if="modelValue" class="pt-4">
            <ul
                role="list"
                class="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
                <li
                    v-for="(file, key) in files"
                    :key="key"
                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                >
                    <div class="flex w-0 flex-1 items-center">
                        <svg
                            class="h-5 w-5 flex-shrink-0 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <div class="ml-4 flex min-w-0 flex-1 gap-2">
                            <span class="truncate font-medium mr-3">{{
                                    file.name
                                }}</span>
                            <span class="flex-shrink-0 text-gray-400">{{
                                    bytesToHumanReadable(file.size)
                                }}</span>
                        </div>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                        <button
                            type="button"
                            class="font-medium text-red-600 hover:text-red-500"
                            @click="handleRemove(file)"
                        >
                            Remove
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { bytesToHumanReadable } from "~/composables/useHelpers";
import { onBeforeUnmount, ref } from "vue";
import VueFeather from 'vue-feather'

const props = defineProps({
    modelValue: {
        type: [Object,null],
        required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: "file",
    },
    label: {
        type: String,
        default: "Upload Resume",
    },
    help: {
        type: String,
        default: "PNG, JPG, GIF up to 10MB",
    },
    accept: {
        type: String,
        default: "image/*",
    },
});

const emit = defineEmits(["update:modelValue"]);

const files = ref(null);
const fileInput = ref(null);

const clickButton = () => {
    fileInput.value.click()
}

const handleInput = (event) => {
    files.value = event.target.files;
    emit(
        "update:modelValue",
        props.multiple ? event.target.files : event.target.files[0]
    );
};

const handleDragDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    files.value = event.dataTransfer.files;
    emit(
        "update:modelValue",
        props.multiple ? event.dataTransfer.files : event.dataTransfer.files[0]
    );
};

const handleRemove = (file) => {
    files.value =
        files.value.length > 1
            ? files.value.filter((f) => f.name !== file.name)
            : null;
    emit("update:modelValue", files.value);
};

onBeforeUnmount(() => {
    files.value = null;
});
</script>
