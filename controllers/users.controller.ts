import { Request, Response } from "express";
import User from "../models/User";



export const getUsers = async ( req: Request, res: Response ) =>{

  const { limit = 5, from = 0 } = req.query;

  const users = await User.findAll({ 
    limit: +limit!,
    offset: +from!,
    where: { status: 1 }
  });

  res.json( users );
};

export const getUser = async ( req: Request, res: Response ) =>{

  const { id } = req.params;

  const user = await User.findByPk( id );

  if( !user ){
    res.status( 400 ).json({
      msg: `There is not exist an user with the ID ${ id }`
    })

    return
  };

  res.json( user );
};

export const postUser = async ( req: Request, res: Response ) =>{

  const { body } = req;

  try{

    const existEmail = await User.findOne({
      where: {
        email: body.email
      }
    });

    if ( existEmail ) {
      return res.status( 400 ).json({
        msg: `There is a user with email ${  body.email }`
      })
    };

    const user = User.build( body );
    
    await user.save();

    res.json({ user });

  } catch ( error ){

    console.log( error );
    res.status( 500 ).json({
      msg: "Report to the administrator"
    });
  };
};

export const putUser = async ( req: Request, res: Response ) =>{

  const { id } = req.params;

  const { body } = req;

  try{

    const user = await User.findByPk( id );

    if( !user ){
      return res.status(404).json({
        msg: `There is not an user with ID ${ id } `
      });
    };

    await user.update( body );

    res.json( user );

  } catch ( error ){

    console.log( error );
    res.status( 500 ).json({
      msg: "Report to the administrator"
    });
  };

};

export const deleteUser = async ( req: Request, res: Response ) =>{

  const { id } = req.params;

  const user = await User.findByPk( id );

  if( !user ){
    return res.status(404).json({
      msg: `There is not an user with ID ${ id }`
    });
  };

  await user?.update({ status: false });
  // await user?.destroy();
  
  res.json( user );
};