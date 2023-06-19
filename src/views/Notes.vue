<script>
export default {
  name: "NotesPanel",
  data() {
    return {
      showModal: false,
      onEditStatus: false,
      wordCount: 0,
      notes: [],
      noteTitle: "",
      noteDescription: "",
      showNotes: false,
      isloading: false,
    };
  },
  computed: {
    notesFromLocalStorage() {
      return JSON.parse(localStorage.getItem("notes")) ?? [];
    },
  },

  watch: {
    noteDescription(value) {
      if (value.trim().length) {
        this.wordCount = value.trim().split(" ").length;
      } else {
        this.wordCount = 0;
      }
    },
  },

  methods: {
    addNote() {
      this.onEditStatus = false;
      if (this.noteTitle.trim() !== "" && this.noteDescription.trim() !== "") {
        this.notesFromLocalStorage.unshift({
          title: this.noteTitle,
          description: this.noteDescription,
        });

        localStorage.setItem(
          "notes",
          JSON.stringify(this.notesFromLocalStorage)
        );
        this.noteTitle = "";
        this.noteDescription = "";
      }
    },

    deleteNote(index) {
      this.notesFromLocalStorage.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(this.notesFromLocalStorage));
      this.showModal = false;
    },
    cancelDelete() {
      this.showModal = false;
    },
    onEdit(index) {
      this.onEditStatus = true;
      this.noteTitle = this.notesFromLocalStorage[index].title;
      this.noteDescription = this.notesFromLocalStorage[index].description;

      this.notesFromLocalStorage.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(this.notesFromLocalStorage));
    },
  },
};
</script>

<template>
  <div class="lg:w-[60%] w-[90%] mx-auto py-14">
    <h2 class="text-[56px] mb-8 font-bold">Notes</h2>

    <div
      v-if="notesFromLocalStorage.length <= 0 && !showNotes"
      class="flex items-center flex-col justify-center w-[90%]"
    >
      <img
        src="../assets/rafiki.png"
        class="h-[300px] mb-4 animate-zoom"
        alt=""
      />
      <p
        @click="showNotes = true"
        class="font-medium text-[28px] text-center cursor-pointer hover:text-gray-500"
      >
        Click here to create your first note !
      </p>
    </div>

    <div
      v-if="showNotes | (notesFromLocalStorage.length > 0)"
      class="flex rounded-md flex-col mb-8 lg:w-[48%] bg-slate-900 p-3"
    >
      <div class="w-full flex justify-end">
        <p class="text-[14px]">{{ wordCount }} words</p>
      </div>
      <input
        class="border h-10 px-3 mb-2 text-[#252525] focus:outline-none"
        v-model="noteTitle"
        placeholder="Title"
      />
      <textarea
        class="border h-20 px-3 mb-2 text-[#252525] focus:outline-none"
        v-model="noteDescription"
        placeholder="Title"
      ></textarea>
      <button
        @click="addNote"
        class="rounded-b-md h-8 bg-[#30BE71] w-auto hover:bg-[#39A971]"
      >
        {{ onEditStatus ? "Save" : "Create" }}
      </button>
    </div>

    <!-- spinner -->
    <div
      v-if="isloading"
      class="fixed inset-0 flex items-center justify-center"
    >
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-500"
      ></div>
    </div>

    <div class="flex flex-wrap justify-between">
      <div
        class="flex animate-appear lg:w-[48%] w-full flex-col p-4 rounded-md mb-4 shadow-lg bg-gray-900"
        v-for="(note, index) in notesFromLocalStorage"
        :key="index"
      >
        <div class="flex justify-between items-center">
          <div @click="showModal = true" class="cursor-pointer">
            <i class="fa-solid fa-trash-can text-[#fff]"></i>
          </div>
          <div @click="onEdit(index)" class="cursor-pointer">
            <i class="fa-solid fa-pen-to-square text-[#fff]"></i>
          </div>
        </div>

        <h2 class="text-[32px] break-words font-bold">{{ note.title }}</h2>
        <p class="break-words text-[22px] font-normal">
          {{ note.description }}
        </p>

        <!-- Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            @click="cancelDelete"
            class="fixed inset-0 bg-gray-500 transition-opacity ease-in-out duration-300 bg-opacity-50 backdrop-blur-sm"
          ></div>

          <div
            class="bg-[#252525] flex flex-col items-center p-6 rounded shadow-md relative transition-transform ease-in-out duration-300 transform scale-0"
            :class="{ 'scale-100': showModal }"
          >
            <h2 class="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete?</p>

            <div class="mt-4 flex justify-between w-full">
              <button
                @click="cancelDelete"
                class="px-4 bg-[#30BE71] text-white rounded-md hover:bg-[#39A971] py-2 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                @click="deleteNote(index)"
                class="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes zoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-zoom {
  animation: zoom 4s infinite ease-in-out;
}
</style>
