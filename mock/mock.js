
//引入mock模块
import Mock from 'mockjs';
const Random = Mock.Random
const token = Random.id()
const userList = {
    userName :'admin',
    passWord :'123ad'
}

 
Mock.mock('/login', 'post',option =>{
    const {userName,passWord}=JSON.parse(option.body);
    if(userList.userName != userName || userList.passWord !=passWord){
        return {
            code :'1001',
            msg :'登陆失败'
        }
    }
    return{
         //输出数据
            code:'1000',
            data:{
                'username':userName,
                'name': Random.cname(), //随机生成姓名
                'date':Random.date('yyyy-MM-dd'),
                'age': Random.natural(22, 40),
                'token':token
            }

    }
}
);

// { //输出数据
//     code:'1000',
//     data:{
//         'name': Random.cname(), //随机生成姓名
//     'date':Random.date('yyyy-MM-dd'),
//     'age': Random.natural(22, 40),
//     'token':token
//     }
// }