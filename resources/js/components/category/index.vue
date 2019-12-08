<template>
<div>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item active">All Categories</li>
    </ol>
    <div class="row-container">
        <div class="card-header">
          <i class="fa fa-chart-area"></i>
          All Category List
          <router-link to="/store-category" class="btn btn-sm btn-info" id="add_new" >Add New Category</router-link>
      </div>
      <div class="card-body">
            <div class="table-responsive">
                <label for="search">Search</label>
                <input type="text" v-model="searchTerm" class="form-control" style="width:400px" placeholder="search by category name"> <br>
              <table class="table table-bordered" id="" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="category in filtersearch" :key="category.id">
                    <td>{{ category.category_name }}</td>
                    <td>
                        <router-link :to="{name: 'edit-category', params:{id: category.id}}" class="btn btn-sm btn-info">Edit</router-link>
                        <a @click="deletecategory(category.id)" class="btn btn-sm btn-danger">Delete</a>
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
        this.allCategory();
    },

    data(){
        return{
            categories:[],
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.categories.filter(supplier => {
                return supplier.category_name.match(this.searchTerm)
            })
        }
    },
    methods:{
        allCategory(){
            axios.get('/api/category/')
            .then(({data}) => (this.categories = data))
            .catch()
        },
        deletecategory(id){
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
                axios.delete('/api/category/'+id)
                .then(()=>{
                    this.categories = this.categories.filter(category =>{
                        return category.id !=id
                    })
                })
                .catch(()=>{
                    this.$router.push({name: 'category'})
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

</style>
