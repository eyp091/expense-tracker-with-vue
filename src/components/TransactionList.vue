<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions" :key="transactions.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>${{ transaction.amount }}$</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
</template>

<script setup>
    import { defineProps } from 'vue';

    const emit = defineEmits(['transactionDeleted']);

    const props = defineProps({
        transactions: {
            type: Array,
            required: true,
        }
    })


    const deleteTransaction = (id) => {
        emit('transactionDeleted', id);
    }
</script>


<!--Options API-->
<!-- <script>
    export default {
        data() {
            return {
                transactions: [
                    { id: 1, text: 'Cash', amount: -400 },
                    { id: 2, text: 'Paycheck', amount: 800 },
                    { id: 3, text: 'Book', amount: -10 },
                    { id: 4, text: 'Camera', amount: -160 }
                ]
            }
        }
    }
</script> -->