<template>
<div>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item active">All Suppliers</li>
    </ol>
    <div class="row-container">
        <div class="card-header">
          <i class="fa fa-chart-area"></i>
          All Supplier List
          <router-link to="/store-supplier" class="btn btn-sm btn-info" id="add_new" >Add New Supplier</router-link>
      </div>
      <div class="card-body">
            <div class="table-responsive">
                <label for="search">Search</label>
                <input type="text" v-model="searchTerm" class="form-control" style="width:400px" placeholder="search by Phone Number"> <br>
              <table class="table table-bordered" id="" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Phone</th>
                    <th>Shop Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="supplier in filtersearch" :key="supplier.id">
                    <td>{{ supplier.name }}</td>
                    <td><img :src="supplier.photo" id="em_photo"></td>
                    <td>{{ supplier.phone }}</td>
                    <td>{{ supplier.shopname }}</td>
                    <td>{{ supplier.address }}</td>
                    <td>
                        <router-link :to="{name: 'edit-supplier', params:{id: supplier.id}}" class="btn btn-sm btn-info">Edit</router-link>
                        <a @click="deleteSupplier(supplier.id)" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
      

    </div>
</div>
</template>

<script>
export default{
    mounted(){
        if(!User.loggedIn()) {
            this.$router.push({name : '/'})
        }
    },
      created(){
        this.allSupplier();
    },

    data(){
        return{
            suppliers:[],
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.suppliers.filter(supplier => {
                return supplier.phone.match(this.searchTerm)
            })
        }
    },
    methods:{
        allSupplier(){
            axios.get('/api/supplier/')
            .then(({data}) => (this.suppliers = data))
            .catch()
        },
        deleteSupplier(id){
            Swal.fire({
            title: 'Are you sure?',
            text : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.value) {
                axios.delete('/api/supplier/'+id)
                .then(()=>{
                    this.suppliers = this.suppliers.filter(supplier =>{
                        return supplier.id !=id
                    })
                })
                .catch(()=>{
                    this.$router.push({name: 'supplier'})
                })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

        }

    },


}
</script>
<style type="text/css">
  #add_new{
      float: right;
  }
  #em_photo{
      height: 40px;
      width: 40px;
  }
</style>
