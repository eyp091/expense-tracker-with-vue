<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expense="+expense" /> <!-- '+' işareti tip dönüşümü için kullanılır, değerler toFixed kullnaıldığı için string döner + number'a çeviririr -->
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';

  import { ref, computed, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  // transaction işlemlerini tek bir bileşende saklamıyoruz. ana uygulama bileşenemizde saklıyoruz.
  // bu sayede transaction işlemlerini istediğimiz bir componente geçirebiliriz ve orada kullanabiliriz. (reaftif)

  // reaftif değerler; değiştiğinde uygulamanın otomatik olarak güncellendiği değerlerdir.
  const transactions = ref([]);

  onMounted(() => {
    const savedTransaction = JSON.parse(localStorage.getItem('transactions'));

    if (savedTransaction) {
      transactions.value = savedTransaction
    }

  })

  // computed property: reaktif verilere dayalı olarak otomatik hesaplanan ve önbelleğe alınan özelliklerdir.
  // Değeri otomatik olarak hesaplanan ve cache'lenen (önbelleğe alınan) bir değişken oluşturur

  // get total
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      // acc: toplam değer, transaction: dizideki ker bir işlem elemanı, 0: acc, başlangıç değeri
      return acc + transaction.amount;
    }, 0);
  });

  // get income

  const income = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
  })

  // get expense
  const expense = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
  });

  // Add transaction
  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
    })

    saveTransactionToLocalStorage();

    toast.success('Transaction added');
  }

  // Generate unique id
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 100000000);
  }

  // delete transaction
  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);

    saveTransactionToLocalStorage();

    toast.success('Transaction deleted');
  }

  // save transaction to local storage
  const saveTransactionToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  }
</script>