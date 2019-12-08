<template>
<div>
    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item active">All Employee</li>
    </ol>
    <div class="row-container">
        <div class="card-header">
          <i class="fa fa-chart-area"></i>
          All Employee List
          <router-link to="/store-employee" class="btn btn-sm btn-info" id="add_new" >Add New Employee</router-link>
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
                    <th>Salary</th>
                    <th>Joining date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="employee in filtersearch" :key="employee.id">
                    <td>{{ employee.name }}</td>
                    <td><img :src="employee.photo" id="em_photo"></td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.salary }}</td>
                    <td>{{ employee.joining_date }}</td>
                    <td>
                        <router-link :to="{name: 'edit-employee', params:{id: employee.id}}" class="btn btn-sm btn-info">Edit</router-link>
                        <a @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger">Delete</a>
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
    data(){
        return{
            employees:[],
            searchTerm:''
        }
    },
    computed:{
        filtersearch(){
            return this.employees.filter(employee => {
                return employee.phone.match(this.searchTerm)
            })
        }
    },
    methods:{
        allEmployee(){
            axios.get('/api/employee/')
            .then(({data}) => (this.employees = data))
            .catch()
        },
        deleteEmployee(id){
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
                axios.delete('/api/employee/'+id)
                .then(()=>{
                    this.employees = this.employees.filter(employee =>{
                        return employee.id !=id
                    })
                })
                .catch(()=>{
                    this.$router.push({name: 'employee'})
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
    created(){
        this.allEmployee();
    }


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
