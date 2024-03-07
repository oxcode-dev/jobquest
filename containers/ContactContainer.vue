<template>
    <div>
        <div class="px-4 md:px-32">
            <pages-hero page="Contact Us" />
        </div>

        <div class="px-4 md:px-32 py-16">
            <div class="w-full flex flex-wrap md:flex-nowrap space-y-8 md:space-y-0">
                <div class="w-full md:w-2/3">
                    <ContactForm />
                </div>
                <div class="w-full md:w-1/3">
                    <ContactInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueFeather from 'vue-feather'
</script>