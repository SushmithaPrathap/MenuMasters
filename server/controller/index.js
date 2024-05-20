export const search = async(req, res) => {
    try{
        let query = req.body.p;
        const recipe = await blogService.find(query);
        setSuccessResponse(recipe,res)

    }
    catch(err){
        setErrorResponse(err,res)
    }
}