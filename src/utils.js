export const checkBoxCollision = (object1, object2) => {
    if(
        //if right side of object1 is greater than left side object2
        object1.position.x + object1.width >= object2.position.x &&
        //if left side of object1 is greater than right side object2
        object1.position.x <= object2.position.x + object2.width &&
        //if bottom side of object1 is greater than top of object2
        object1.position.y + object1.height >= object2.position.y &&
        //if top of object1 is less than bottom of object 2
        object1.position.y <= object2.position.y + object2.height
    )
    return true
}

export const checkAllBoxes = (object1, ...arr) => {
    if(arr.every((platform) => {
        checkBoxCollision(object1, platform)
    }))
    return true
}