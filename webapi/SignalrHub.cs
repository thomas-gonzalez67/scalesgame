using Microsoft.AspNetCore.SignalR;
using webapi.Model;

public class SignalrHub : Hub
{

    public async Task AddToGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    }



    public async Task CheckR(string groupName)
    {
        await Clients.Group(groupName).SendAsync("ToGame");
    }

    public async Task CheckS(string groupName)
    {
        await Clients.Group(groupName).SendAsync("ToResults");
    }


    public async Task RemoveFromGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);


    }

    public async Task ToRules(string groupName)
    {
        await Clients.Group(groupName).SendAsync("toRules");


    }


}