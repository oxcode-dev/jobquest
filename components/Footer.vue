<template>
    <footer class="relative bg-gray-900 text-white pt-8 p-6 md:px-32">
        <div class="container mx-auto my-12">
            <div class="flex flex-wrap text-left lg:text-left">
                <div class="w-full md:w-1/2">
                    <div class="w-40 my-2">
                        <Logo />
                    </div>
                    <h4 class="text-2xl font-semibold">Let's keep in touch!</h4>
                    <h5 class="text-sm mt-0 mb-2 text-gray-300">
                        Find us on any of these platforms, we respond 1-2 business days.
                    </h5>
                    <div class="mt-6 lg:mb-0 mb-6">
                        <button class="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i class="fab fa-facebook-square"></i>
                        </button>
                        <button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i class="fab fa-dribbble"></i>
                        </button>
                        <button class="bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i class="fab fa-github"></i>
                        </button>
                    </div>
                </div>
                <div class="w-full md:w-1/2 md:px-4">
                    <div class="flex flex-wrap items-top mb-6">
                        <div class="w-full lg:w-1/2 xl:w-1/3 ml-auto">
                            <span class="block uppercase text-gray-200 text-sm font-semibold mb-2">Useful Links</span>
                            <ul class="list-unstyled">
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="/about">About Us</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="/blogs">Blogs</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="/contact">Contact Us</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="#">Free Products</nuxt-link>
                                </li>
                            </ul>
                        </div>
                        <div class="w-full lg:w-1/2 xl:w-1/3">
                            <span class="block uppercase text-gray-200 text-sm font-semibold mb-2">Other Resources</span>
                            <ul class="list-unstyled">
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="#">MIT License</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="#">Terms &amp; Conditions</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="#">Privacy Policy</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="text-gray-200 hover:text-gray-400 font-normal block pb-2 text-sm" to="/contact">Contact Us</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-300" />
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                    <div class="text-sm text-gray-200 font-semibold py-1">
                        Copyright © <span id="get-current-year">2021</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>