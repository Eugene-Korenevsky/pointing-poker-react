import React from 'react'
import { MemberCardKind } from '../../../model/MemberCardKind'

export interface ImageBlockProps {
  image?: string
  name: string
  surname: string
  kind: MemberCardKind
}

export default function ImageBlock(props: ImageBlockProps): JSX.Element {
  const userInitials = props.surname ? `${props.name[0].toUpperCase()}${props.surname[0].toUpperCase()}` :
    `${props.name[0].toUpperCase()}${props.name[props.name.length - 1].toUpperCase()}`
  const faceImage: JSX.Element = <img src={props.image} className={props.kind === MemberCardKind.SIMPLE ?
    'member-card__simple-face-image-block' : 'member-card__chat-face-image-block'} alt="user photo"></img>

  const defaultImage: JSX.Element = <div className={props.kind === MemberCardKind.SIMPLE ?
    'member-card__simple-image-block' : 'member-card__chat-image-block'}>
    {userInitials}</div>

  const image: JSX.Element = (props.image && props.image.length > 2) ? faceImage : defaultImage;

  return image

}