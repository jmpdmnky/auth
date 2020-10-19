<template>
    <div class="alert alert-danger">
        {{message}}
    </div>
</template>
<script>
/* originally based on https://sanaulla.info/2019/04/20/integrating-amazon-cognito-with-single-page-application-vue-js/ */

export default {
    data: function(){
        return {
            message: "ERROR"
        }
    }
}
</script>