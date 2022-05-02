// const requireLogin = (req, res, next) => {
// 	const { authorization } = req.headers;
// 	if (!authorization) {
// 		return res.status(401).json({ error: "you must be logged in" });
// 	}
// 	try {
// 		const { userId } = jwt.verify(authorization, JWT_SECRET);
// 		req.user = userId;
// 		next();
// 	} catch (err) {
// 		return res.status(401).json({ error: "you must be logged in" });
// 	}
// };


// app.post('/createtodo',requireLogin,async (req,res)=>{
//     const data = await new Todo({
//           todo:req.body.todo,
//           todoBy:req.user
//       }).save()
//       res.status(201).json({message:data})
// })

// app.get('/gettodos',requireLogin,async (req,res)=>{
//   const data =  await Todo.find({
//        todoBy:req.user
//    })
//    res.status(200).json({message:data})
// })