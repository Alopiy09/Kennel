import React, { Component } from 'react'

class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                        {owner.name}:
                        {owner.phoneNumber}
                        <div>
                            <button
                                onClick={() => this.props.deleteOwner(owner.id)}
                                className="card-link">Delete</button>
                                </div>
                        </div>
                )
            }
            </section>
        )
    }
}
export default OwnerList